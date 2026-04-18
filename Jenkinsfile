pipeline {
    agent any

    environment {
        SONAR_TOKEN = 'sqa_a5b5b58b5f0331ac620d7bf9b57fdbf43f988e44'
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
                -Dsonar.host.url=http://devops-stack_sonarqube_1:9000 \
                -Dsonar.token=$SONAR_TOKEN
                '''
            }
        }
    }
}

