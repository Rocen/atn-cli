import { downloadLocal } from './utils/get';
import ora from 'ora';
import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';
import symbol from 'log-symbols';

let init = async(templateName, projectName) => {
    if (!fs.existsSync(projectName)) {
        inquirer.prompt([
            {
                name: 'description',
                message: 'Please enter the project description'
            },
            {
                name: 'author',
                message: 'Please enter the author name'
            }
        ]).then(async (answer) => {
            let loading = ora({
                text: 'downloading template ...',
                color: 'green',

            });

            loading.start();
            downloadLocal(templateName, projectName).then(() => {
                loading.succeed();
                const fileName = `${projectName}/package.json`;
                if(fs.existsSync(fileName)){
                    const data = fs.readFileSync(fileName).toString();
                    let json = JSON.parse(data);
                    json.name = projectName;
                    json.author = answer.author;
                    json.description = answer.description;
                    //修改项目文件夹中 package.json 文件
                    fs.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
                    console.log(symbol.success, chalk.green('Project initialization finished!'));
                }
            }).catch((err) => {
                ora().fail('Sorry, download template failed.')
            });
        })
    }else {
         //项目已经存在
         console.log(symbol.error, chalk.red('The project already exists'));
    }
}

module.exports = init;


