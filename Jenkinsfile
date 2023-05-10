pipeline {
    
    environment{
        DOCKERHUB = credentials('hub_credentials')
        JWT_KEY = credentials('JET_KEY')
        // MYSQL = credentials('MCR_DB_CRED')
        // MYSQL_ROOT_PASSWORD = credentials('MYSQL_ROOT_PASSWORD')
        // APP_DB = credentials('MYSQL_DB')
        PORT = credentials('SERVER_PORT')
        MCR_DB_URI = credentials('MCR_DB_URI')
        MCR_VAULT_PASSWORD = credentials('MCR_VAULT_PASSWORD')
    }

    agent any

    stages {


        stage('building project images'){
            steps{
               
                sh '''
                    docker build -t dishang09/mcr_backend ./backend
                    docker build -t dishang09/mcr_frontend ./client
                '''
            }
        }  
        stage('stopping containers'){
            
            steps{

                    sh '''
                        docker stop mcr_backend mcr_frontend
                    '''
            }

        }
        stage('testing application'){

            steps{
                
                sh '''
                    cd ./backend
                    npm ci
                    export DB_URT=$DB_URI
                    export PORT=$PORT
                    export JWT_KEY=$JWT_KEY
                    npm test
                    cd ..
                '''

            }

        }


        stage('uploading image to registry'){
            steps{
                sh '''
                        docker login -u $DOCKERHUB_USR -p $DOCKERHUB_PSW
                        docker push dishang09/mcr_backend
                        docker push dishang09/mcr_frontend
                    '''
            }
        }

        stage('cleaning local images'){
            steps{
                sh 'docker rmi dishang09/mcr_backend dishang09/mcr_frontend'
            }
        }

        stage('deploy application'){
            steps{

                ansiblePlaybook(
                inventory: 'inventory',
                playbook: 'deployment_playbook.yaml',
                vaultCredentialsId: 'MCR_VAULT_PASSWORD')
            }
        }
    }
}
