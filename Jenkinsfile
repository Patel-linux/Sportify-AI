pipeline {
    agent any

    stages {

        stage('Clone') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Patel-linux/Sportify-AI.git'
            }
        }

        stage('Install & Build (Docker Node)') {
            steps {
                sh '''
                    docker run --rm \
                    -v $WORKSPACE:/app \
                    -w /app \
                    node:20 \
                    bash -c "npm install && npm run build"
                '''
            }
        }
    }
}
       
