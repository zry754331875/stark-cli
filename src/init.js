import { downloadLocal } from './utils/get'
import ora from 'ora'
import inquirer from 'inquirer'
import fs from 'fs'
import chalk from 'chalk'
import symbol from 'log-symbols'
const { exec } = require('child_process')

const title = () => {
  /* 
    _________________________ __________ ____  __.         _________ .____    .___ 
 /   _____/\__    ___/  _  \\______   \    |/ _|         \_   ___ \|    |   |   |
 \_____  \   |    | /  /_\  \|       _/      <    ______ /    \  \/|    |   |   |
 /        \  |    |/    |    \    |   \    |  \  /_____/ \     \___|    |___|   |
/_______  /  |____|\____|__  /____|_  /____|__ \          \______  /_______ \___|
        \/                 \/       \/        \/                 \/        \/   
  */
}

let init = async projectName => {
  //项目不存在
  if (!fs.existsSync(projectName)) {
    //命令行交互
    inquirer
      .prompt([
        {
          name: 'description',
          message: 'Please enter the project description: '
        },
        {
          name: 'author',
          message: 'Please enter the author name: '
        }
      ])
      .then(async answer => {
        //下载模板 选择模板
        //通过配置文件，获取模板信息
        let loading = ora('downloading template ...')
        loading.start()
        downloadLocal(`${projectName}`).then(
          () => {
            loading.succeed()
            const fileName = `${projectName}/package.json`
            if (fs.existsSync(fileName)) {
              try {
                const data = fs.readFileSync(fileName).toString()
                let json = JSON.parse(data)
                json.name = projectName
                json.author = answer.author
                json.description = answer.description
                //修改项目文件夹中 package.json 文件
                fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8')

                let installLoading = ora('yarn install ...')
                installLoading.start()
                exec(`cd ${projectName} && yarn install`, (err, stdout, stderr) => {
                  if (err) {
                    installLoading.fail()
                    console.error(chalk.red(stderr))

                    if (err.code == 127) {
                      console.error(chalk.red(`You must exec 'npm install yarn -g'`))
                    }

                    return
                  }
                  installLoading.succeed()

                  console.log(chalk.green(stdout))
                  console.log(symbol.success, chalk.green('Project initialization finished!'))
                  console.log(
                    chalk.red(
                      title
                        .toString()
                        .slice(
                          title.toString().indexOf('/*') + 3,
                          title.toString().lastIndexOf('*/')
                        )
                    )
                  )
                })
              } catch (error) {
                console.log(chalk.red(error.toString()))
              }
            }
          },
          error => {
            console.log(chalk.red(error.toString()))

            loading.fail()
          }
        )
      })
  } else {
    //项目已经存在
    console.log(symbol.error, chalk.red('The project already exists'))
  }
}

module.exports = init
