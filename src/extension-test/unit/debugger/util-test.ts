import { expect } from 'chai';
import { moveTokenCursorToBreakpoint } from '../../../debugger/util';
import * as mock from '../common/mock';
import * as fs from "fs";

function getCoordinates(text: string): (string | number)[] {
    return text.split('\n')[0].split(' ').slice(1).map(coor => {
        if (coor.startsWith('"')) {
            return coor.replace(/"/g, '');
        } else {
            return parseInt(coor);
        }
    });
}

function getTestFileText(fileName: string): string {
    return fs.readFileSync(__dirname + '/test-files/' + fileName, 'utf8');
}

describe('Debugger Util', async () => {

    let doc: mock.MockDocument;
    let debugResponse: any;

    beforeEach(() => {
        doc = new mock.MockDocument();

        debugResponse = {
            line: 0,
            column: 0
        };
    });

    function expectBreakpointToBeFound(fileName: string) {
        const docText = getTestFileText(fileName);
        debugResponse.coor = getCoordinates(docText);
        doc.insertString(docText);
        const tokenCursor = doc.getTokenCursor(0);
        moveTokenCursorToBreakpoint(tokenCursor, debugResponse);
        expect(tokenCursor.getPrevToken().raw.endsWith('|')).equals(true);
    }

    describe('moveTokenCursorToBreakpoint', () => {

        it('simple example', async () => {
            expectBreakpointToBeFound('simple.clj');
        });
    });
});
