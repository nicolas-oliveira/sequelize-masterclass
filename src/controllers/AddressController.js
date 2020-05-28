const User = require('../models/User');
const Address = require('../models/Address');

module.exports = {
    async index(request, response) {
        const { user_id } = request.params;

        const user = await User.findByPk(user_id, {
            include: { association: 'addresses' }
        });
        
        // Gera duas queries com o endereço do usuário
        // const address = await Address.findAll({ where: { user_id } });
        // return response.json(address);

        return response.json(user.addresses);
    },

    async store(request, response) {
        const { user_id } = request.params;
        const { zipcode, street, number } = request.body;

        const user = await User.findByPk(user_id);

        if(!user){
            return response.status(400).json({ error: 'User not found' });
        }

        const address = await Address.create({
            zipcode,
            street,
            number,
            user_id,
        });

        return response.json(address);
    }
};