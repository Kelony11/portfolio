module.exports = {
    apps: [
        {
            name: "KEVIN_PORTFOLIO_SERVER",
            script: "npm",
            args: "start",
            instances: 1,
            exec_mode: "cluster",
        }
    ]
}