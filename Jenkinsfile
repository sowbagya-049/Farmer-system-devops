pipeline {
    agent any

    environment {
        SONAR_TOKEN = 'sqa_e1b3561204b6480e750e03dbfc389792f7087093'
        SONAR_HOST_URL = 'http://sonarqube:9000'
        PROJECT_KEY = 'smart-farmer-devops'
    }

    stages {

        stage('Build + Sonar Scan') {
            steps {
                sh '''
                docker run --rm \
                --network=devops-net \
                -v $(pwd):/app \
                node:18 bash -c "

                set -e

                echo '📦 Installing dependencies...'
                cd /app
                npm install

                echo '🛠 Installing tools...'
                apt update && apt install -y unzip wget curl

                echo '⬇ Downloading Sonar Scanner...'
                wget -q https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
                unzip -oq sonar-scanner-cli-*.zip

                echo '🔍 Running SonarQube Scan...'
                ./sonar-scanner-*/bin/sonar-scanner \
                -Dsonar.projectKey=$PROJECT_KEY \
                -Dsonar.projectBaseDir=/app \
                -Dsonar.sources=. \
                -Dsonar.host.url=$SONAR_HOST_URL \
                -Dsonar.token=$SONAR_TOKEN

                echo '⏳ Waiting for analysis...'
                sleep 10

                echo '📊 Checking Quality Gate...'
                STATUS=\$(curl -s -u $SONAR_TOKEN: \
                $SONAR_HOST_URL/api/qualitygates/project_status?projectKey=$PROJECT_KEY \
                | grep -o '"status":"[^"]*"' | cut -d':' -f2 | tr -d '"')

                echo "Quality Gate Status: \$STATUS"

                if [ "\$STATUS" != "OK" ]; then
                    echo '❌ Quality Gate FAILED'
                    exit 1
                else
                    echo '✅ Quality Gate PASSED'
                fi
                "
                '''
            }
        }
    }
}
