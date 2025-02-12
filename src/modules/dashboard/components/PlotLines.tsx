import Plot from "react-plotly.js";

export const PlotLines = ({ data, config }) => {
  return (
    <Plot
      data={data}
      layout={{
        width: 600,
        height: 400,
        plot_bgcolor: "#2c2f36",
        paper_bgcolor: "#2c2f36",
        font: {
          color: "#ffffff", // Texto blanco
        },
        xaxis: {
          type: "category",
          gridcolor: "#444", // Color de las líneas del grid en el eje x
        },
        yaxis: {
          gridcolor: "#444", // Color de las líneas del grid en el eje y
        },
        title: {
          text: config.title.text,
          font: {
            size: 20,
            color: "#ffffff", // Título en blanco
          },
        },
        legend: {
          font: {
            color: "#ffffff", // Color blanco para la leyenda
          },
        },
      }}
    />
  );
};

export default PlotLines;
