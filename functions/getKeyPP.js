
module.exports = async (userid) => {

    let [response] = await server.db.query('SELECT 4kpp, 7kpp, 10kpp FROM users_stats WHERE id = ?', [userid]);

    return response[0];
}