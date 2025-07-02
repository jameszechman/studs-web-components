var path = require('path');
var fs = require('fs');
var { TSDocParser, TSDocConfiguration } = require('@microsoft/tsdoc');
var { TSDocConfigFile } = require('@microsoft/tsdoc-config');

const exts = ['.tsx', '.ts']
const inputPath = '../../packages/ui/src/components';
const outputPath = 'scripts/component-metadata';
const configFilePath = '../tsdoc.json';

const _renderDocNode = (node, key) => {
    switch (node.kind) {
        case 'CodeSpan':
            return (
                (node).code
            );
        case 'ErrorText':
            return (node).text
        case 'EscapedText':
            return (node).decodedText
        case 'FencedCode':
            const docFencedCode = node;
            return (
                docFencedCode.code
            );
        case 'LinkTag':
            const linkTag = node;
            if (linkTag.urlDestination) {
                const linkText = linkTag.linkText || linkTag.urlDestination;
                return (

                    linkText
                );
            } else {
                let identifier = '';
                if (linkTag.codeDestination) {
                    // TODO: The library should provide a default rendering for this
                    const memberReferences =
                        linkTag.codeDestination.memberReferences;
                    if (memberReferences.length > 0) {
                        const memberIdentifier =
                            memberReferences[memberReferences.length - 1].memberIdentifier;
                        if (memberIdentifier) {
                            identifier = memberIdentifier.identifier;
                        }
                    }
                }
                const linkText = linkTag.linkText || identifier || '???';
                return (
                    linkText
                );
            }
        // case 'Paragraph':
        //     // Collapse spaces in the paragraph
        //     const transformedParagraph = tsdoc.DocNodeTransforms.trimSpacesInParagraph(
        //         node
        //     );

        //     return this._renderContainer(transformedParagraph)}</p>;
        case 'PlainText':
            return node._text;
        case 'SoftBreak':
            return '\n'
    }
    return undefined;
}


// Load the nearest config file, for example `my-project/tsdoc.json`
const tsdocConfigFile = TSDocConfigFile.loadForFolder(path.dirname(configFilePath));
if (tsdocConfigFile.hasErrors) {
    // Report any errors
    console.error(tsdocConfigFile.getErrorSummary());
}

// Use the TSDocConfigFile to configure the parser
const tsdocConfiguration = new TSDocConfiguration();
tsdocConfigFile.configureParser(tsdocConfiguration);
const tsdocParser = new TSDocParser(tsdocConfiguration);

const readFile = (_inputFilePath, index) => {
    var file = _inputFilePath.split('\\').pop();

    fs.readFile(_inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file ${file}:`, err);
            return;
        }
        const metadata = {
            id: index,
            file: file,
            name: file.split('.')?.[0],
            properties: [],
        }
        const res = tsdocParser.parseString(data);

        const paramList = [];
        const slotsList = [];
        for (const paramBlock of res.docComment.params.blocks) {
            const contentNodes = paramBlock._content?._nodes || [];
            const tempParam = {
                name: paramBlock?._parameterName,
                description: '',
                type: '',
                defaultValue: undefined,
            }
            contentNodes?.map(cn => {
                cn._nodes?.forEach((node, i) => {
                    let tempDes = _renderDocNode(node) || '';
                    if (i === 0) {
                        const splits = tempDes?.split(' - ') || [];
                        const withoutDesSplits = tempDes?.split(': ') || []
                        if (splits.length === 2 && splits[1].length > 0) {
                            const additionalInfo = splits[0];
                            const splitsAdditionalInfos = additionalInfo.split('=');
                            tempParam.type = splitsAdditionalInfos[0]?.replace(': ', '')?.trim();
                            tempParam.defaultValue = splitsAdditionalInfos[1]?.trim();
                            tempDes = splits[1]?.trim();
                        } else if(withoutDesSplits?.length === 2 && withoutDesSplits[1].length > 0) {
                            // Has params and without description
                            const additionalInfo = withoutDesSplits[1];
                            const splitsAdditionalInfos = additionalInfo.split('=');
                            tempParam.type = splitsAdditionalInfos[0]?.replace(': ', '')?.trim();
                            tempParam.defaultValue = splitsAdditionalInfos[1]?.trim();
                            tempDes = '';
                        }
                    }
                    tempParam.description += tempDes;
                })
            })
            if(tempParam?.type === 'slot') {
                slotsList.push(tempParam)
            } else {
                paramList.push(tempParam);
            }
        }
        metadata.properties = paramList;
        metadata.slots = slotsList;

        writeFile(`${file?.split('.')[0]}.json`, JSON.stringify(metadata));
    });
}


const writeFile = (filePath, jsonString) => {
    if (!fs.existsSync(outputPath)) {
        // If the folder does not exist, create it
        fs.mkdir(outputPath, { recursive: true }, (err) => {
            if (err) {
                console.error('Error creating folder:', err);
                return;
            }
            console.info('Folder created successfully');
        });
    }


    fs.writeFile(`${outputPath}/${filePath}`, jsonString, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.info('Successful: ', filePath);
    });
}

function* walkSync(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) {
            yield* walkSync(path.join(dir, file.name));
        } else {
            yield path.join(dir, file.name);
        }
    }
}

const start = () => {
    const filePaths = walkSync(inputPath);
    let i = 0;
    for (const filePath of filePaths) {
        readFile(filePath, i);
        i++;
    }
}

start();