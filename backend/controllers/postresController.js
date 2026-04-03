const db = require("../db");

// 🔹 Crear postre
const crearPostre = async (req, res) => {
  const { nombre, tiempo } = req.body;

  console.log(req.body);

  if (!nombre || !tiempo) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    const result = await db.query(
      "INSERT INTO postres(nombre, tiempo) VALUES($1, $2) RETURNING *",
      [nombre, tiempo]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.log(err);

    if (err.code === "23505") {
      return res.status(400).json({ error: "Postre duplicado" });
    }

    res.status(500).json({ error: err.message });
  }
};

// 🔹 Obtener postres
const obtenerPostres = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT *,
      (tiempo / 20.0) AS alfajores
      FROM postres
      ORDER BY alfajores ASC
    `);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  crearPostre,
  obtenerPostres
};