import random
import string


def generate_otp(length=8):
    """Generate a random OTP of given length."""
    characters = string.digits
    otp = ''.join(random.choice(characters) for _ in range(length))
    return "123456"

def generate_random_string(length=8):
    """Generate a random string of given length."""
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.choice(characters) for _ in range(length))
    return random_string

def password_hash(password: str):
    """Hash the given password."""
    return password

from ..config.config import Config
from jinja2 import Environment, FileSystemLoader
from email.message import EmailMessage
import aiosmtplib

import os

# Get the directory of the current script (send_otp.py)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Set up Jinja2 environment to load templates from "templates/" in the same directory
template_env = Environment(loader=FileSystemLoader(os.path.join(BASE_DIR, "templates")))


async def send_email(to_email: str, subject: str, template_name: str, template_data: dict):
    """
    Sends an email using a Jinja2 template.

    :param to_email: Recipient email address
    :param subject: Email subject
    :param template_name: Jinja2 template filename (inside templates/)
    :param template_data: Data dictionary to render in template
    """
    try:

        

        # Load and render the email template
        template = template_env.get_template(template_name)
        email_body = template.render(template_data)

        # Create email message
        message = EmailMessage()
        message["From"] = Config.SMTP_EMAIL
        message["To"] = to_email
        message["Subject"] = subject
        message.set_content(email_body, subtype="html")  # Send as HTML

        # Send email via SMTP
        await aiosmtplib.send(
            message,
            hostname=Config.SMTP_SERVER,
            port=Config.SMTP_PORT,
            username=Config.SMTP_EMAIL,
            password=Config.SMTP_PASSWORD,
            start_tls=True,
        )
        print(f"✅ Email sent successfully to {to_email}")
        return True

    except Exception as e:
        print(f"❌ Failed to send email: {e}")
        return False