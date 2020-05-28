const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
    async show(request, response) {
        // Exemplo de uma query complexa com mais de 3 relacionamentos
        // DevStory:
        // Encotrar todos os usuários que tem email que temina com @gmail.com
        // Desses usuários quero buscar todos que são da "Rua Ipatinga"
        // Desses usuários quero buscar as tecnologias que começam com React

        const users =await User.findAll({
            attributes: ['name', 'email' ],
            where: {
                email: {
                    // para que a variável não seja passada como uma string
                    // é necessário que se coloque colchetes dessa forma o 
                    // valor do operador 'Op.ilike' é passado.
                    [Op.iLike]: '%@gmail.com'
                }
            },
            include: [
                { 
                    association: 'addresses', 
                    where: { 
                        street: 'Rua Ipatinga' 
                    }
                },
                { 
                    association: 'techs', 
                    required: false,
                    where: {
                        name: {
                            [Op.iLike]: 'React%'
                        }
                    } 
                },
            ]
        })
        return response.json(users)
    }
}