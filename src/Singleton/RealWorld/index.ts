/**
 * Ensure there is only one instance of a Logger class that provides
 * a global point of access to it.
 *
 * Solution: Use the Singleton pattern to create a Logger class that has only
 * one instance and provides a global access point to that instance.
 */

/**
 * The Logger class defines the `getInstance` method that lets clients
 * access the unique singleton instance.
 */

class Logger {
    private static instance: Logger;
    private readonly entries: string[] = [];

    private constructor() {}

    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    //Business logic method for adding log entries.
    public add(log: string) {
        this.entries.push(log);
    }

    // Method to display all log entries.
    public displayLogs() {
        console.log(this.entries.join("\n"));
    }
}

// Usage: Example client code using the Logger singleton.

const clientCode = () => {
    const logger1 = Logger.getInstance();
    const logger2 = Logger.getInstance();

    logger1.add("Log entry from logger1.");
    logger2.add("Log entry from logger2.");

    //Since logger1 and logger2 are the same instance, the log entries will be combined.
    logger1.displayLogs();

    const result =
        logger1 == logger2
            ? "Logger works, both variables contain the same instance."
            : "Logger failed, variables contain different instances.";

    console.log(result);
};

clientCode();
