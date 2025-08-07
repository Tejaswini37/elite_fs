// A software development company is designing a smart home automation 
// system that uses sensor networks to monitor and control different devices 
// in a house. The sensors are organized in a hierarchical structure, where each 
// sensor node has a unique ID and can have up to two child nodes (left and right).

// The company wants to analyze the left-most sensors in the system to determine
// which ones are critical for detecting environmental changes. The hierarchy of 
// the sensors is provided as a level-order input, where missing sensors are 
// represented as -1.

// Your task is to build the sensor network as a binary tree and then determine 
// the left-most sensor IDs at each level.

// Input Format:
// -------------
// Space separated integers, elements of the tree.

// Output Format:
// --------------
// A list of integers representing the left-most sensor IDs at each level


// Sample Input-1:
// ---------------
// 1 2 3 4 -1 -1 5

// Sample Output-1:
// ----------------
// [1, 2, 4]



// Sample Input-2:
// ---------------
// 3 2 4 1 5

// Sample Output-2:
// ----------------
// [3, 2, 1]
import java.util.*;
class Node
{
	public int data=-1; 
	public Node left, right; 
	public Node(int data)
	{
		this.data = data; 
		left = null; 
		right = null; 
	}
}
public class BinaryTreeLeftView{
	public static void solve(int level[]){
		Node root=construct(level);
		ArrayList<Integer> a=new ArrayList<>();
		left(root,a);
		System.out.println(a);
	}
	public static void left(Node root,ArrayList<Integer> a ){
		if(root!=null) a.add(root.data);
		else return;
		if(root.left!=null) left(root.left,a);
		else if(root.right!=null) left(root.right,a);
	}
	public static Node construct(int level[]){
		if(level.length==0) return null;
		int n=level.length;
		Node root=new Node(level[0]);
		Queue<Node> q=new LinkedList<>();
		q.add(root);
		int i=1;
		while(!q.isEmpty() && i<n){
			Node t=q.poll();
			if(level[i]!=-1){
				t.left=new Node(level[i]);
				
				q.add(t.left);
			}
			i++;
			if(i<n && level[i]!=-1){
				t.right=new Node(level[i]);
				q.add(t.right);
			}
			i++;

		}
		return root;
	}
	public static void main(String[] args) {
		Scanner sc=new Scanner(System.in);
		String s[]=sc.nextLine().split(" ");
		int level[]=new int[s.length];
		for(int i=0;i<s.length;i++){
			level[i]=Integer.parseInt(s[i]);
		}
		solve(level);
	}
}
