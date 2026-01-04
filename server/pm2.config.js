module.exports = {
    apps: [
        {
            name: "KEVIN_PORTFOLIO_SERVER",
            script: "npm",
            args: "start",
            instances: 1,
            exec_mode: "cluster",
            listen_timeout: 10000,
            restart_delay: 10000,
            env: {
                NODE_ENV: "production",
                PORT:4000

            }
        }
    ]
}