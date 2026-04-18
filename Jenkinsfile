pipeline {
    agent any

    environment {
        SONAR_TOKEN = 'sqa_cc1f3bf90a44b669b11c79b96570a501a828653c'
    }

    stages {

        stage('Build + Sonar Scan') {
            steps {
                sh '''
                set -e

                echo "📦 Installing backend dependencies..."
                cd backend
                npm install
                cd ..

                echo "🛠 Installing tools..."
                apt update && apt install -y unzip wget curl

                echo "⬇ Downloading Sonar Scanner..."
                wget -q https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip
                unzip -oq sonar-scanner-cli-*.zip

                echo "🔍 Running SonarQube Scan..."
                ./sonar-scanner-*/bin/sonar-scanner \
                -Dsonar.projectKey=smart-farmer-devops \
                -Dsonar.sources=backend \
                -Dsonar.host.url=http://sonarqube:9000 \
                -Dsonar.token=$SONAR_TOKEN

                echo "⏳ Waiting for analysis..."
                sleep 10

                echo "📊 Checking Quality Gate..."
                STATUS=$(curl -s -u $SONAR_TOKEN: http://sonarqube:9000/api/qualitygates/project_status?projectKey=smart-farmer-devops | grep -o '"status":"[^"]*"' | head -n 1 | cut -d':' -f2 | tr -d '"')

                echo "Quality Gate Status: $STATUS"

                if [ "$STATUS" != "OK" ]; then
                    echo "❌ Quality Gate FAILED"
                    exit 1
                else
                    echo "✅ Quality Gate PASSED"
                fi
                '''
            }
        }
    }
}
