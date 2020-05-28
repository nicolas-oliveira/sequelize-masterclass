const User = require('../models/User');
const Tech = require('../models/Tech');

module.exports = {
    async index(request, response) {
        const { user_id } = request.params;

        const user = await User.findByPk(user_id, {
            include: { 
                association: 'techs',
                attributes: [ 'name' ],
                through: {
                    attributes: []
                }
            }
        });
        return response.json(user.techs);
    },

    async store(request, response) {
        const { user_id } = request.params;
        const { name } = request.body;

        const user = await User.findByPk(user_id);

        if(!user) {
            return response.status(400).json({ error: 'User not found' });
        }

        // findOrCreate: Procura por uma tecnologia, caso não encontre ele irá 
        // criar uma nova
        const [ tech ] = await Tech.findOrCreate({
            where: { name }
        });

        await user.addTech(tech);

        return response.json(tech);
    },

    async delete(request, response) {
        const { user_id } = request.params;
        const { name } = request.body;

        const user = await User.findByPk(user_id);

        if(!user) {
            return response.status(400).json({ error: 'User not found' });
        }

        const tech = await Tech.findOne({
            where: { name }
        });

        await user.removeTech(tech);

        return response.json();
    },
};