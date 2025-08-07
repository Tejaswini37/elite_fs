 
# Use an official Python runtime as the base image
FROM python:3.9

# Set the working directory inside the container
WORKDIR /app

# Copy the application files into the container
COPY app.py /app

# Install required Python packages
RUN pip install flask

# Expose the application port (Flask runs on port 80)
EXPOSE 80

# Define the command to run the application
CMD ["python", "app.py"]
