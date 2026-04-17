stage('Debug Structure') {
    steps {
        sh '''
        docker run --rm \
        --network=devops-net \
        -v $(pwd):/app \
        node:18 bash -c "

        echo '===== PROJECT STRUCTURE ====='
        ls -R /app
        "
        '''
    }
}

