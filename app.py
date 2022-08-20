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
    print("Nice")
    return render_template("login.html")

# Register page
@app.route("/register")
def register():
    return render_template("register.html")

# Profile page
@app.route("/profile")
def profile():
    return render_template("profile.html")

# Contact page
@app.route("/contact")
def contact():
    return render_template("contact.html")

# About page
@app.route("/about")
def about():
    return render_template("about.html")

# run the app
if __name__ == "__main__":
    app.run(debug=True)