pipeline {
    agent any

    environment {
        SONAR_TOKEN = 'sqa_c2e8b6ad21dd1f115bc4d2ef5c9dfb84420bb885'
    }

    stages {

        stage('Build Backend') {
            steps {
                sh '''
                set -e
                echo "📦 Installing backend dependencies..."
                cd backend
                npm install
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                set -e
                echo "📦 Installing frontend dependencies..."
                cd frontend
                npm install
                npm run build
                '''
            }
        }

        stage('SonarQube Scan') {
            steps {
                sh '''
                echo "🔍 Running SonarQube Scan..."

                sonar-scanner \
                -Dsonar.projectKey=smart-farmer-devops \
                -Dsonar.sources=backend \
                -Dsonar.host.url=http://host.docker.internal:9001 \
                -Dsonar.login=$SONAR_TOKEN
                '''
            }
        }
    }
}

