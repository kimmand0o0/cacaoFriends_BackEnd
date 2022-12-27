module.exports = {
    apps: [
        {
            name: 'cacaoFriends_BackEnd',
            script: 'src/app.js',
            instances: 1,
            exec_mode: 'cluster',
            merge_logs: true,
            autorestart: true,
            watch: false,
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};
