package com.graduacionunal.backend.datastructures;

import com.graduacionunal.backend.datastructures.queue.MyQueue;
import com.graduacionunal.backend.datastructures.queue.MyQueueArrayList;
import com.graduacionunal.backend.datastructures.queue.MyQueueUnderFlowException;

public class Graph {
    private final LinkedList<Integer>[] adjList;
    private final boolean directed;

    public Graph(int n) {
        this(n, false);
    }

    @SuppressWarnings("unchecked")
    public Graph(int n, boolean directed) {
        adjList = (LinkedList<Integer>[]) new LinkedList<?>[n];
        this.directed = directed;
        for (int i = 0; i < n; i++) {
            adjList[i] = new LinkedList<>();
        }
    }

    public void addEdge(int u, int v) {
        if (u == v) {
            return;
        }
        if (!adjList[u].contains(v)) {
            adjList[u].pushBack(v);
        }
        if (!directed && !adjList[v].contains(u)) {
            adjList[v].pushBack(u);
        }
    }

    public LinkedList<Integer> getNeighbors(int u) {
        return adjList[u];
    }

    public int countNodesDFS() {
        boolean[] visited = new boolean[adjList.length];
        return dfs(0, visited);
    }

    private int dfs(int start, boolean[] visited) {
        visited[start] = true;
        int count = 1;
        for (Integer i : adjList[start]) {
            if (!visited[i]) {
                count += dfs(i, visited);
            }
        }
        return count;
    }

    public int countNodesBFS() {
        boolean[] visited = new boolean[adjList.length];
        return bfs(0, visited);
    }

    private int bfs(int start, boolean[] visited) {
        int count = 0;
        MyQueue<Integer> queue = new MyQueueArrayList<>(adjList.length == 0 ? 1 : adjList.length);
        queue.enqueue(start);
        while (!queue.isEmpty()) {
            Integer item;
            try {
                item = queue.dequeue();
            } catch (MyQueueUnderFlowException e) {
                // Should not happen because we check isEmpty(), break defensively.
                break;
            }
            if (!visited[item]) {
                count += 1;
            }
            visited[item] = true;
            for (Integer adj : adjList[item]) {
                if (!visited[adj]) {
                    queue.enqueue(adj);
                }
            }
        }
        return count;
    }
}
