import { generatePie, shadeColor } from './lib';

const DEFAULT_RADIUS = 60;
const MAX_VALUE = 10;

const Direction = {
    CLOCKSWISE: -1,
    ANTI_CLOCKWISE: 1,
};

type CircularProgressBarProps = {
    maxValue?: number,
    selectedValue?: number,
    radius?: number,
    strokeWidth?: number,
    label?: string,
    activeStrokeColor?: string,
    inactiveStrokeColor?: string,
    labelFontSize?: number,
    valueFontSize?: number,
    withGradient?: boolean,
    anticlockwise?: boolean,
    initialAngularDisplacement?: number,
    backgroundColor?: string,
    textColor?: string,
};

export function UiCircularProgressBar({
    maxValue=MAX_VALUE,
    selectedValue=0,
    radius=DEFAULT_RADIUS,
    strokeWidth=DEFAULT_RADIUS / 10,
    label='',
    activeStrokeColor='#62E7E5',
    inactiveStrokeColor='#ddd',
    backgroundColor='#fff',
    textColor='#000',
    labelFontSize=Math.floor(DEFAULT_RADIUS / 3),
    valueFontSize=Math.floor(DEFAULT_RADIUS / 2.5),
    withGradient=false,
    anticlockwise=false,
    initialAngularDisplacement=0,
}:CircularProgressBarProps) {

    // ----  PIE Area calculation  --------
    const calculatePieValue = (numberOfBars: number) => {
        const angle = 360 / numberOfBars;
        const pieValue = Math.floor(angle / 4);
        return pieValue < 1 ? 1 : Math.floor(angle / 4);
    };

    // ----  PIE render funciton --------
    const renderPie = (i: number) => {
        const DIRECTION = anticlockwise ? Direction.ANTI_CLOCKWISE : Direction.CLOCKSWISE;
        // Rotation Calculation
        const primaryRotationAngle = (maxValue - 1) * (360 / maxValue);
        const rotationAngle = DIRECTION * initialAngularDisplacement
    + -1 * DIRECTION * primaryRotationAngle
    + i * DIRECTION * primaryRotationAngle;
        const rotationTransformation = `rotate(${rotationAngle}, ${radius}, ${radius})`;

        const pieValue = calculatePieValue(maxValue);
        const dValue = generatePie(pieValue, radius);

        const activeColor = withGradient
            ? shadeColor(activeStrokeColor, ((i + 1) * maxValue) / 50)
            : activeStrokeColor;

        const fillColor = selectedValue > 0 && i <= selectedValue
            ? activeColor : inactiveStrokeColor;

        return (
            <path
                style={{ opacity: i === 0 ? 0 : 1 }}
                key={i}
                d={dValue}
                fill={fillColor}
                transform={rotationTransformation}
            />
        );
    };

    // ----  Creates a circle by combining the Pie(s) --------
    const renderOuterCircle = () => [...Array(maxValue + 1)].map((_, i) => renderPie(i));

    const labelView = (
        <text
            fill={textColor}
            fontSize={labelFontSize}
            x={radius}
            y={radius + (labelFontSize ?? 0)}
            textAnchor="middle"
        >
            {label}
        </text>
    );

    const textValueY = label ? radius : radius + valueFontSize / 3;

    // --------  MAIN Render --------
    return (
        <svg width={radius * 2} height={radius * 2}>
            {renderOuterCircle()}

            {/* This is the overlay circle */}
            <circle r={radius - strokeWidth} cx={radius} cy={radius} fill={backgroundColor} />

            <text
                fill={textColor}
                fontSize={valueFontSize}
                fontWeight="bold"
                x={radius}
                y={textValueY}
                textAnchor="middle"
            >
                {selectedValue}
            </text>
            {!!label.length && labelView}
        </svg>
    );
};

