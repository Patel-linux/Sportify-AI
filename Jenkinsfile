pipeline {
    agent any

    environment {
        IMAGE_NAME = "sportify-ai"
        CONTAINER_NAME = "sportify-ai-container"
        PORT = "3000"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Patel-linux/Sportify-AI.git'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                docker build -t $IMAGE_NAME .
                '''
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker run -d \
                  --name $CONTAINER_NAME \
                  -p $PORT:3000 \
                  $IMAGE_NAME
                '''
            }
        }

        stage('Health Check') {
            steps {
                sh '''
                docker ps | grep $CONTAINER_NAME
                '''
            }
        }
    }

    post {
        success {
            echo "🚀 Deployment Successful!"
        }

        failure {
            echo "❌ Deployment Failed"
        }

        always {
            echo "✔ Pipeline execution completed"
        }
    }
}
       
