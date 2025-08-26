#!/bin/bash

# Spring Tool Suite 4 Startup Script for Linux
# Make sure this script is executable: chmod +x start-sts4.sh

# Set Java home if needed
# export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64

# Check if Java is available
if ! command -v java &> /dev/null; then
    echo "Error: Java is not installed or not in PATH"
    exit 1
fi

# Check Java version
JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2 | cut -d'.' -f1)
if [ "$JAVA_VERSION" -lt 11 ]; then
    echo "Warning: Java 11 or higher is recommended for STS4"
fi

# Set STS4 installation directory (adjust this path)
STS4_DIR="/opt/spring-tool-suite-4"
if [ ! -d "$STS4_DIR" ]; then
    echo "Error: STS4 directory not found at $STS4_DIR"
    echo "Please install STS4 or update the STS4_DIR variable in this script"
    exit 1
fi

# Launch STS4
echo "Starting Spring Tool Suite 4..."
cd "$STS4_DIR"
./SpringToolSuite4 -configuration workspace/.metadata/.plugins/org.eclipse.pde.core/SpringToolSuite4