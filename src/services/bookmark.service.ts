import { QueryCommand } from './dynamodb.service';
import { docClient } from './dynamodb.service';
import { ActionListBookmark } from '../types';

export class BookmarkService {
  private tableName: string = process.env.ACTION_LIST_BOOKMARK_TABLE!;

  async getBookmarksByUserAndBoard(userId: string, boardId: string): Promise<ActionListBookmark[]> {
    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'userId-boardId-index',
      KeyConditionExpression: 'userId = :userId AND boardId = :boardId',
      ExpressionAttributeValues: {
        ':userId': userId,
        ':boardId': boardId,
      },
    });

    const result = await docClient.send(command);
    return result.Items as ActionListBookmark[] || [];
  }
}