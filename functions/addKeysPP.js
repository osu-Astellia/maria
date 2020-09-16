module.exports = async (keys,pp,user) => {
    let response = await global.server.db.query('UPDATE users_stats SET ?kpp = ?kpp + ? WHERE id = ?', [
        keys,
        keys,
        pp,
        user
    ]);

    return response;
}