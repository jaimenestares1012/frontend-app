import Plot from "react-plotly.js";

export const PlotPie = ({ data, config }) => {
  return (
    <Plot
      data={data}
      layout={{
        width: 600,
        height: 400,
        plot_bgcolor: "#2c2f36", // Fondo oscuro
        paper_bgcolor: "#2c2f36", // Fondo oscuro fuera del gráfico
        font: {
          color: "#ffffff", // Texto blanco
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

export default PlotPie;
