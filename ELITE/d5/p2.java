// Construct the binary tree from the given In-order and Pre-order. 
// Find Nodes Between Two Levels in Spiral Order.
// The spiral order is as follows:
// -> Odd levels → Left to Right.
// -> Even levels → Right to Left.

// Input Format:
// --------------
// An integer N representing the number of nodes.
// A space-separated list of N integers representing the in-order traversal.
// A space-separated list of N integers representing the pre-order traversal.
// Two integers:
// Lower Level (L)
// Upper Level (U)

// Output Format:
// Print all nodes within the specified levels, but in spiral order.

// Example:
// Input:
// 7
// 4 2 5 1 6 3 7
// 1 2 4 5 3 6 7
// 2 3

// Output:
// 3 2 4 5 6 7

// Explanation:
// Binary tree structure:
//         1
//        / \
//       2   3
//      / \  / \
//     4   5 6  7

// Levels 2 to 3 in Regular Order:
// Level 2 → 2 3
// Level 3 → 4 5 6 7

// Spiral Order:
// Level 2 (Even) → 3 2 (Right to Left)
// Level 3 (Odd) → 4 5 6 7 (Left to Right)
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
    public static void solve(int n,int in[],int pre[],int lb,int ub){
        int preIndex[]=new int[]{0};
        HashMap<Integer,Integer> hm=new HashMap<>();
        for(int i=0;i<n;i++){
            hm.put(in[i],i);
        }
        Node root=construct(pre,0,n-1,preIndex,hm);
        List<List<Integer>> l=level(root);
        ArrayList<Integer> ans=new ArrayList<>();
        for(int i=lb-1;i<ub;i++){
            if(i%2==0){
                ans.addAll(l.get(i));
            }
            else{
                List<Integer> currLevel=l.get(i);
                Collections.reverse(currLevel);
                ans.addAll(currLevel);
            }
        }
        System.out.println(ans);
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
    public static Node construct(int pre[],int start,int end,int[] preIndex,HashMap<Integer,Integer> hm ){
        if(start>end) return null;
        int d=pre[preIndex[0]++];
        Node root=new Node(d);
        int index=hm.get(d);
        root.left=construct(pre,start,index-1,preIndex,hm);
        root.right=construct(pre,index+1,end,preIndex,hm);
        return root;
    }
    public static void main(String args[]){
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        int in[]=new int[n];
        int pre[]=new int[n];
        for(int i=0;i<n;i++){
            in[i]=sc.nextInt();
        }
        for(int i=0;i<n;i++){
            pre[i]=sc.nextInt();
        }
        int lb=sc.nextInt();
        int ub=sc.nextInt();
        solve(n,in,pre,lb,ub);
        
    }
}