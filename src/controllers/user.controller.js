const { pool } = require('../database');





// FUNCION LOGIN 


async function loginUser(req, res) {
  const { user, password } = req.body; 
  const sql = 'SELECT id_user, user FROM usuarios WHERE user = ? AND password = ?'; 
  const params = [user, password]; 

  try {
    const [rows] = await pool.promise().query(sql, params);

    if (rows.length > 0) {
      const userData = {
        id_user: rows[0].id_user,
        user: rows[0].user 
      };
      res.status(200).json({ success: true, user: userData });
    } else {
      res.status(401).json({ success: false, message: 'Los datos de inicio de sesión no coinciden' });
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}

module.exports = {
  loginUser 
};