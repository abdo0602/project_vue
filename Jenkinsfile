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
  }
}
