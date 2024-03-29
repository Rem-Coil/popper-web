import circlet.pipelines.script.ScriptApi

job("Build and deploy web") {
    parameters {
        secret("firebase_token", value = "{{ project:popper-web-firebase-token }}")
        text("version", value = "{{ project:system-version }}")
    }

    startOn {
        gitPush {
            branchFilter {
                +Regex("develop")
                +Regex("release")
            }
        }
    }

    host(displayName = "Start new deployment") {
        kotlinScript(displayName = "Start") { api ->
            api.space().projects.automation.deployments.start(
                project = api.projectIdentifier(),
                targetIdentifier = TargetIdentifier.Key("web"),
                version = api.currentVersion,
                syncWithAutomationJob = true,
            )
        }
    }

    container(displayName = "Build and deploy", image = "node:lts-alpine") {
        env["FIREBASE_TOKEN"] = "{{ firebase_token }}"

        shellScript(displayName = "Build and deploy") {
            content = """
                echo -------------------------------
                echo Installing app dependencies
                echo -------------------------------
                
                npm ci
                
                echo -------------------------------
                echo Building app
                echo -------------------------------
                
                npm run build
                
                echo -------------------------------
                echo Installing firebase-cli
                echo -------------------------------
                
                npm install -g firebase-tools
                
                echo -------------------------------
                echo Deploying on firebase hosting
                echo -------------------------------
                
                firebase deploy
            """
        }
    }

    host(displayName = "Send notification") {
        kotlinScript(displayName = "Send") { api ->
            api.space().chats.messages.sendMessage(
                channel = ChannelIdentifier.Channel(ChatChannel.FromName("Deployment Notifications")),
                content = ChatMessage.Text(
                    """
                        :zap: :zap: Новая версия [Веба](https://remcoil.site/) выложена!!!
                        Текущая версия: **${api.currentVersion}**
                    """.trimIndent()
                )
            )
        }
    }
}


val ScriptApi.currentVersion: String
    get() = "${parameters["version"]}-dev-${executionNumber()}"
