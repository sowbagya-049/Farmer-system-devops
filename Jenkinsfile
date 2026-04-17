pipeline {
    agent any

    environment {
        SONAR_TOKEN = 'sqa_e1b3561204b6480e750e03dbfc389792f7087093'
    }

    stages {

        stage('Run in Docker') {
            steps {
                sh '''
                docker run --rm \
                --network=devops-net \
                -v $(pwd):/app \
                node:18 bash -c "

                # Move to project root
                cd /app

                # Install backend dependencies correctly
                cd backend
                npm install
                cd ..

                # Install required tools
                apt update && apt install -y unzip wget

                # Download Sonar Scanner
                wget -q https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
                unzip -oq sonar-scanner-cli-*.zip

                # Run Sonar Scanner from PROJECT ROOT (IMPORTANT)
                ./sonar-scanner-*/bin/sonar-scanner \
                -Dsonar.projectKey=smart-farmer-devops \
                -Dsonar.projectBaseDir=/app \
                -Dsonar.sources=backend \
                -Dsonar.host.url=http://sonarqube:9000 \
                -Dsonar.token=$SONAR_TOKEN
                "
                '''
            }
        }
    }
}
