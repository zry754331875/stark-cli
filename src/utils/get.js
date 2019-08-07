import downloadGit from 'download-git-repo'

export const downloadLocal = async projectName => {
  return new Promise((resolve, reject) => {
    downloadGit('github:zry754331875/stark-template', projectName, err => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
}
