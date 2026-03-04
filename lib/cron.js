import cron from "node-cron";
import axios from "axios";

export const startCronJobs = () => {
  console.log("⏰ Cron iniciado...");

  // Ejecuta todos los días a las 9 AM
  cron.schedule("0 9 * * *", async () => {
    try {
      console.log("🚀 Ejecutando alertas...");

      await axios.get("http://localhost:3000/api/alerts");

      console.log("✅ Alertas ejecutadas");
    } catch (error) {
      console.error("❌ Error en cron:", error.message);
    }
  });
};