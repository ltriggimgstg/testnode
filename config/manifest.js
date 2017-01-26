
module.exports = {
        server: {

        },
        connections: [
            {port: process.env.PORT || 5000,
            }
        ],
        registrations: [
            { plugin: { register: 'bell'}},
            { plugin: { register: './utils/auth'}},
        ]
        
};
