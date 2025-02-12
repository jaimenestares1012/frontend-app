import Plot from "react-plotly.js";

export const PlotBar = ({ data, config }) => {
  return (
    <Plot
      data={data}
      layout={{
        width: 600,
        height: 400,
        plot_bgcolor: "#2c2f36",
        paper_bgcolor: "#2c2f36",
        font: {
          color: "#ffffff",
        },
        xaxis: {
          gridcolor: "#444",
        },
        yaxis: {
          gridcolor: "#444",
        },
        title: {
          text: "Ventas por producto",
          font: {
            size: 20,
            color: "#ffffff",
          },
        },
        legend: {
          font: {
            color: "#ffffff",
          },
        },
      }}
    />
  );
};

export default PlotBar;
