import subprocess
import time
import webbrowser
import sys
import shutil

def check_node():
    print("Checking for Node.js...")
    node_path = shutil.which("node")
    if node_path is None:
        print("Node.js is not installed! Please install it from https://nodejs.org/")
        input("Press Enter to exit...")
        sys.exit(1)
    else:
        print("Node.js found at:", node_path)

def install_dependencies():
    print("Installing dependencies...")
    try:
        # Install specific packages using npm
        subprocess.run(["npm", "install", "express", "cors", "body-parser"], check=True)
    except subprocess.CalledProcessError:
        print("Failed to install dependencies. Please check your npm setup.")
        sys.exit(1)

def start_server():
    print("Starting the server...")
    try:
        # This will open a new command prompt window on Windows running 'node server.js'
        subprocess.Popen(["cmd", "/c", "start", "cmd", "/k", "node server.js"])
    except Exception as e:
        print("Failed to start the server:", e)
        sys.exit(1)

def open_browser():
    url = "http://127.0.0.1:3000/index.html"
    print("Waiting for server to start...")
    time.sleep(3)  # Wait for the server to boot up
    print("Attempting to open the form URL in the default browser...")
    try:
        webbrowser.open(url)
    except Exception as e:
        print("Failed to open the browser using webbrowser module:", e)
        print("Please manually navigate to:")
        print(url)
    input("Press Enter to exit...")

if __name__ == "__main__":
    check_node()
    install_dependencies()
    start_server()
    open_browser()
