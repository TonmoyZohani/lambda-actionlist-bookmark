import { BatchGetCommand } from './dynamodb.service';
import { docClient } from './dynamodb.service';
import { ActionList } from '../types';

export class ActionListService {
  private tableName: string = process.env.ACTION_LIST_TABLE!;

  async getActionListsByIds(ids: string[]): Promise<ActionList[]> {
    const command = new BatchGetCommand({
      RequestItems: {
        [this.tableName]: {
          Keys: ids.map(id => ({ id }))
        }
      }
    });

    const result = await docClient.send(command);
    return result.Responses?.[this.tableName] as ActionList[] || [];
  }
}