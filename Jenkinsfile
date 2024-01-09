pipeline {
  agent any
  stages {
    stage('Check for vulnerabilities') {
      steps {
        sh 'npm audit --parseable --production'
        sh 'npm outdated || exit 0'
      }
    }
    stage('download dependencies') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Check linting') {
      steps {
        sh 'npm run lint'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Build Docker') {
      steps {
        sh 'docker build -t myapp .'
      }
    }
    stage('Docker Build') {
            steps {
                withDockerRegistry([credentialsId: "docker_hub", url: "https://index.docker.io/v1/"]) {
                    script {
                        // Assuming your Dockerfile is in the root directory
                        app = docker.build("asecurityguru/testeb:latest")
                    }
                }
            }
        }
    }

    post {
        success {
            // Push the image to Docker Hub
            script {
                docker.withRegistry('https://index.docker.io/v1/', 'docker_hub') {
                    app.push()
                }
            }
        }
  }
}
