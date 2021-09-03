import { getAll } from './rc';
import gitClone from './download';

export const downloadLocal = async (templateName, projectName) => {
    let config = await getAll();
    let api = `${config.registry}/${templateName}`;
    return new Promise((resolve, reject) => {
        gitClone({
            url: api,
            targetPath: projectName
        }, (err) => {
            if (err) reject(err);
            resolve();
        })
    })
}