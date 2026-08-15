const requiredEnvVars = [
    "PORT",
    "MONGODB_URI",
    "JWT_SECRET",
    "CLOUDINARY_NAME",
    "CLOUDINARY_KEY",
    "CLOUDINARY_SECRET"
];

const validateEnv = () => {
    const missing = requiredEnvVars.filter(
        (variable) => !process.env[variable]
    );

    if (missing.length > 0) {
        console.error("\nApplication failed to start.");
        console.error("Missing environment variables:\n");
        missing.forEach(variable => {
            console.error(`   - ${variable}`);
        });

        process.exit(1);
    }

    console.log("\nEnvironment variables loaded successfully\n");
};

module.exports = validateEnv;