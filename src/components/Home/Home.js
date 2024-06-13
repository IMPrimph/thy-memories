import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Posts from '../Posts/Posts.js'
import Form from '../Form/Form.js'
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts.js';
import Paginate from '../Pagination/Pagination.jsx';
import useStyles from './styles';
import { useHistory, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function Home() {
    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const location = useLocation();

    const handleKeyPress = (e) => {
        if ((e?.charCode || e?.keyCode ) === 13) {
            searchPost();
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag]);
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter((tag) => tag !== tagToDelete));
    }

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({
                search,
                tags: tags.join(',')
            }))
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            history.push('/');
        }
    }

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container className={classes.gridContainer} justifyContent='space-between' alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField
                                name='search'
                                variant='outlined'
                                label='Search Memories'
                                onKeyPress={handleKeyPress}
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={(chip) => handleAdd(chip)}
                                onDelete={(chip) => handleDelete(chip)}
                                label='Search Tags'
                                variant='outlined'
                            />
                            <Button color='primary' variant='contained' onClick={searchPost} className={classes.searchButton}>
                                Search
                            </Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Paginate page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home