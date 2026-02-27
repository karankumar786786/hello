pipeline {
    agent any

    environment {
        IMAGE_NAME = 'karankumar9955/hello'
        IMAGE_TAG  = 'latest'
    }

    stages {

        stage('Clone') {
            steps {
                checkout scmGit(
                    branches: [[name: 'main']],
                    userRemoteConfigs: [[url: 'https://github.com/karankumar786786/hello.git']]
                )
            }
        }

        stage('Build') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerHubCredential',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASSWORD'
                )]) {
                    sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Image') {
            steps {
                sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }

        stage('Deploy') {
            steps {
                withCredentials([file(
                    credentialsId: 'hello-env',
                    variable: 'ENV_FILE'
                )]) {
                    sh '''
                        cp $ENV_FILE .env
                        docker compose down || true
                        docker compose up -d
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully! Image: ${IMAGE_NAME}:${IMAGE_TAG}"
        }
        failure {
            echo "Pipeline failed. Check logs above."
        }
        always {
            sh 'docker logout || true'
        }
    }
}