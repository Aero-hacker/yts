import Chart from "react-apexcharts";
import "./styles.css";
const FieldItem = ({ type, field }) => {
  let fieldComponent = null;
  switch (type) {
    case "input":
      fieldComponent = (
        <input
          style={{
            color: field.props.color,
            fontSize: field.props.fontSize,
          }}
          type="text"
          placeholder="Enter text"
          className=" border border-gray-400 px-4 py-2 rounded-[10px]"
          value={field.props.text}
          onChange={(e) => {}} // Use onTextChange
        />
      );
      break;
    case "label":
      fieldComponent = (
        <p
          style={{
            color: field.props.color,
            fontSize: field.props.fontSize,
          }}
        >
          {field.props.text}
        </p>
      );
      break;
    case "button":
      fieldComponent = (
        <div
          style={{
            color: field.props.color,
            fontSize: field.props.fontSize,
          }}
          className="bg-primary px-4 py-2 flex justify-center rounded-[10px] text-white"
        >
          {field.props.text ? field.props.text : "Button"}
        </div>
      );
      break;
    case "space":
      fieldComponent = (
        <div className="h-3 rounded-md w-10 border bg-gray-200"></div>
      );
      break;
    case "switch":
      fieldComponent = (
        <label class="switch">
          <input type="checkbox" checked />
          <span class="slider round"></span>
        </label>
      );
      break;
    case "slider":
      fieldComponent = (
        <input
          type="range"
          min="0"
          max="100"
          value="50"
          class="slider2"
          id="myRange"
        />
      );
      break;
    case "value":
      fieldComponent = (
        <p
          style={{
            color: field.props.color,
            fontSize: field.props.fontSize,
          }}
        >
          {field.props.text}
        </p>
      );
      break;
    case "gauge":
      fieldComponent = (
        <div>
          <div id="card" className="RadialBarCard">
            <div id="chart">
              <Chart
                options={{
                  chart: {
                    height: 150,
                    type: "radialBar",
                    toolbar: {
                      show: true,
                    },
                  },
                  plotOptions: {
                    radialBar: {
                      startAngle: -135,
                      endAngle: 225,
                      hollow: {
                        margin: 0,
                        size: "70%",
                        background: "#fff",
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: "front",
                        dropShadow: {
                          enabled: true,
                          top: 3,
                          left: 0,
                          blur: 4,
                          opacity: 0.24,
                        },
                      },
                      track: {
                        background: "#fff",
                        strokeWidth: "67%",
                        margin: 0, // margin is in pixels
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.35,
                        },
                      },

                      dataLabels: {
                        show: true,
                        name: {
                          offsetY: -10,
                          show: true,
                          color: "#888",
                          fontSize: "14px",
                        },
                        value: {
                          formatter: function (val) {
                            return parseInt(val);
                          },
                          color: "#111",
                          fontSize: "28px",
                          show: true,
                        },
                      },
                    },
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shade: "dark",
                      type: "horizontal",
                      shadeIntensity: 0.5,
                      gradientToColors: ["#ABE5A1"],
                      inverseColors: true,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 100],
                    },
                  },
                  stroke: {
                    lineCap: "round",
                  },
                  labels: [`${field.props.text}`],
                }}
                series={[60]}
                type="radialBar"
                height={250}
              />
            </div>
          </div>
          <div id="html-dist"></div>
        </div>
      );
      break;
    default:
      fieldComponent = null;
  }
  return fieldComponent;
};

export default FieldItem;
