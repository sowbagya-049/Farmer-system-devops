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
                -w /app \
                node:18 bash -c "

                apt update && apt install -y unzip wget

                npm install

                wget -q https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip

                unzip -oq sonar-scanner-cli-*.zip

                cd sonar-scanner-*/bin

                chmod +x sonar-scanner

                ./sonar-scanner \
                -Dsonar.projectKey=smart-farmer-devops \
                -Dsonar.sources=/app/backend \
                -Dsonar.host.url=http://sonarqube:9000 \
                -Dsonar.login=$SONAR_TOKEN
                "
                '''
            }
        }
    }
}

