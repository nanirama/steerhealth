@Library("jenkins-shared-lib@master") _

pipeline {
    agent any
    environment {
        ENV = "${params.ENVIRONMENT}"
        APP_NAME = "steerhealth-website"
        SANITY_API_READ_TOKEN = credentials('steerhealth-sanity-readtoken')
        SANITY_API_WRITE_TOKEN = credentials('steerhealth-sanity-writetoken')
        SANITY_AUTH_TOKEN = credentials('steerhealth-sanity-authtoken')
    }
    

    stages {
        stage('Set Environment Variables') {
            steps {
                script {
                    envVars = getEnvironmentVariables(env.ENV)
                    envVars.each { key,value ->
                        env."${key}" = "${value}"
                    }
                }
            }
        }

        stage('Notify') {
            steps {
                slack_steer('STARTED')
            }
        }
        
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
      
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("$REPO:${ENV}-v${BUILD_ID}",'--build-arg NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID \
                        --build-arg NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET \
                        --build-arg SANITY_API_READ_TOKEN=$SANITY_API_READ_TOKEN \
                        --build-arg SANITY_API_WRITE_TOKEN=$SANITY_API_WRITE_TOKEN \
                        --build-arg SANITY_AUTH_TOKEN=$SANITY_AUTH_TOKEN \
                        --build-arg NEXT_PUBLIC_SANITY_PROJECT_TITLE=$NEXT_PUBLIC_SANITY_PROJECT_TITLE \
                        --build-arg NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
                    .')
                }
            }
        }
        
        stage('Push to GCR') {
            steps {
                push_gcr(env.ENV, env.REPO, env.BUILD_ID)
            }
        }

        stage('Deploy to GKE') {
            steps {
                deploy_gke(env.ENV, env.REPO, env.KUBE_CONTEXT, env.BUILD_ID, env.APP_NAME, env.ROOT_URL)
            }
        }

        stage('Get status of Deployment to GKE') {
            steps {
                check_gke_status(env.ENV, env.REPO, env.KUBE_CONTEXT, env.BUILD_ID, env.APP_NAME)
            }
        }
    }
    
    post {
        always {
            steer_public_logs()
        }
        success {
            slack_steer('SUCCESS')
        }
        failure {
            slack_steer(buildStatus = 'FAILURE', testStatus = "$env.testStatus")
        }
    }
}
def getEnvironmentVariables(environment) {
    def envVars = [
        demo: [
            KUBE_CONTEXT: "gke_steer-cms_us-west1_steer-cms-gke",
            REPO: "us.gcr.io/dialogflow-252620/$APP_NAME",
            ROOT_URL: "steerhealth.beingbuilt.org",
            NEXT_PUBLIC_SANITY_PROJECT_ID: "70tsvcgi",
            NEXT_PUBLIC_SANITY_DATASET: "development",
            SANITY_API_READ_TOKEN: "$SANITY_API_READ_TOKEN",
            SANITY_API_WRITE_TOKEN: "$SANITY_API_WRITE_TOKEN",
            SANITY_AUTH_TOKEN: "$SANITY_AUTH_TOKEN",
            NEXT_PUBLIC_SANITY_PROJECT_TITLE: "STEERHEALTH",
            NEXT_PUBLIC_SITE_URL: "https://steerhealth.beingbuilt.org",
        ],
        production: [
            KUBE_CONTEXT: "gke_steer-cms_us-west1_steer-cms-gke",
            REPO: "us.gcr.io/dialogflow-252620/$APP_NAME",
            ROOT_URL: "steerhealth.io",
            NEXT_PUBLIC_SANITY_PROJECT_ID: "70tsvcgi",
            NEXT_PUBLIC_SANITY_DATASET: "production",
            SANITY_API_READ_TOKEN: "$SANITY_API_READ_TOKEN",
            SANITY_API_WRITE_TOKEN: "$SANITY_API_WRITE_TOKEN",
            SANITY_AUTH_TOKEN: "$SANITY_AUTH_TOKEN",
            NEXT_PUBLIC_SANITY_PROJECT_TITLE: "STEERHEALTH",
            NEXT_PUBLIC_SITE_URL: "https://steerhealth.io",
        ]

    ]
    return envVars[environment]
}
