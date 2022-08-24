# Imports
from flask import Flask, render_template, request, url_for

# Flask as an object
app = Flask(__name__)

# Routes
@app.route("/")
def index():
    return render_template("index.html")

# Login page
@app.route("/login")
def login():
    return render_template("login.html")

# Register page
@app.route("/register")
def register():
    return render_template("register.html")

# Profile page
@app.route("/profile")
def profile():
    return render_template("profile.html")

# Reset password URL
@app.route("/reset")
def resetLink():
    return render_template("resetPass.html")

@app.route("/forgotPassword")
def forgotPassword():
    return render_template("forgotPassword.html")

if __name__ == "__main__":
    app.run(debug=True)