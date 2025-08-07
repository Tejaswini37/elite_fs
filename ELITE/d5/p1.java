// Given the in-order and post-order traversals of a binary tree, construct 
// the original binary tree. For the given Q number of queries, 
// each query consists of a lower level and an upper level. 
// The output should list the nodes in the order they appear in a level-wise.

// Input Format:
// -------------
// An integer N representing the number nodes.
// A space-separated list of N integers representing the similar to in-order traversal.
// A space-separated list of N integers representing the similar to post-order traversal.
// An integer Q representing the number of queries.
// Q pairs of integers, each representing a query in the form:
// Lower level (L)
// Upper level (U)

// Output Format:
// For each query, print the nodes in order within the given depth range

// Example
// Input:


// Output:
// [1, 2, 3]
// [2, 3, 4, 5, 6, 7]

// Explanation:
//         1
//        / \
//       2   3
//      / \  / \
//     4   5 6  7
// Query 1 (Levels 1 to 2): 1 2 3
// Query 2 (Levels 2 to 3): 2 3 4 5 6 7

// Example
// Input:
// 7
// 4 2 5 1 6 3 7
// 4 5 2 6 7 3 1
// 2
// 1 2
// 2 3
// Output:
// [1, 2, 3]
// [2, 3, 4, 5, 6, 7]
import java.util.*;
class Node{
    int data;
    Node left;
    Node right;
    Node(int d){
        this.data=d;
        left=null;
        right=null;
    }
}
class Solution{
    public static HashMap<Integer,Integer> hm=new HashMap<>();
    public static int postIndex;
    public static void solve(int n,int in[],int post[],int k,int a[][]){
        postIndex=n-1;
        for(int i=0;i<n;i++){
            hm.put(in[i],i);
        }
        Node root=construct(post,0,n-1);
        List<List<Integer>> l=level(root);
        for(int i=0;i<k;i++){
            int lb=a[i][0];
            int ub=a[i][1];
            List<Integer> ans=new ArrayList<>();
            for(int j=lb;j<=ub;j++){
                ans.addAll(l.get(j-1));
            }
            System.out.println(ans);
        }
    }
    public static List<List<Integer>> level(Node root){
        Queue<Node> q=new LinkedList<>();
        List<List<Integer>> l=new ArrayList<>();
        q.add(root);
        while(!q.isEmpty()){
            int size=q.size();
            ArrayList<Integer> al=new ArrayList<>();
            for(int i=0;i<size;i++){
                Node t=q.poll();
                al.add(t.data);
                if(t.left!=null) q.add(t.left);
                if(t.right!=null) q.add(t.right);
            }
            l.add(al);
        }
        return l;
    }
    public static Node construct(int post[],int start,int end){
        if(start>end) return null;
        int d=post[postIndex--];
        Node root =new Node(d);
        int index=hm.get(d);
        root.right=construct(post,index+1,end);
        root.left=construct(post,start,index-1);
        return root;
    }
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        int in[]=new int[n];
        int post[]=new int[n];
        for(int i=0;i<n;i++){
            in[i]=sc.nextInt();
            
        }
        for(int i=0;i<n;i++){
            post[i]=sc.nextInt();
            
        }
        int k=sc.nextInt();
        int a[][]=new int[k][2];
        for(int i=0;i<k;i++){
            a[i][0]=sc.nextInt();
            a[i][1]=sc.nextInt();
        }
        solve(n,in,post,k,a);
    }
}